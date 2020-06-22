module ApplicationHelper
  def checkErrors(object)
    object.errors.messages.merge(error: true)
  end
end
